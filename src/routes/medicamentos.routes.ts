import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Medicamento } from "../entities/Medicamento";
import { authMiddleware } from "../middleware/auth";

const medicamentosRouter = Router();
const medicamentoRepository = AppDataSource.getRepository(Medicamento);

// Middleware para autenticação
medicamentosRouter.use(authMiddleware);

// Rota para cadastrar medicamentos com usuário autenticado
medicamentosRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, descricao, quantidade } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        if (!nome || !quantidade) {
            return res.status(400).json({ message: "Nome e quantidade são obrigatórios" });
        }

        const medicamento = medicamentoRepository.create({
            nome,
            descricao,
            quantidade,
            user: { id: userId },
        });

        await medicamentoRepository.save(medicamento);
        res.status(201).json(medicamento);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar medicamento", error: (error as Error).message });
    }
});


// Rota para listar medicamentos
medicamentosRouter.get("/all", async (_req: Request, res: Response) => {
    try {
        const medicamentos = await medicamentoRepository.find({ relations: ["user"] });
        res.status(200).json(medicamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar medicamentos", error: (error as Error).message });
    }
});

// Rota para buscar medicamento por id do usuário
medicamentosRouter.get("/", async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const medicamentos = await medicamentoRepository.find({ where: { user: { id: userId } } });
        res.status(200).json(medicamentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar medicamentos do usuário", error: (error as Error).message });
    }
});

// Rota para buscar medicamento por id
medicamentosRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const medicamento = await medicamentoRepository.findOne({ where: { id: Number(id) }, relations: ["user"] });

        if (!medicamento) {
            return res.status(404).json({ message: "Medicamento não encontrado" });
        }

        res.status(200).json(medicamento);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar medicamento", error: (error as Error).message });
    }
});


// Rota para editar medicamento por id, somente o usuário criador pode editar
medicamentosRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const medicamento = await medicamentoRepository.findOne({ where: { id: Number(id) }, relations: ["user"] });

        if (!medicamento) {
            return res.status(404).json({ message: "Medicamento não encontrado" });
        }

        if (medicamento.user.id !== userId) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        const { nome, descricao, quantidade } = req.body;

        medicamento.nome = nome || medicamento.nome;
        medicamento.descricao = descricao || medicamento.descricao;
        medicamento.quantidade = quantidade || medicamento.quantidade;

        await medicamentoRepository.save(medicamento);
        res.status(200).json(medicamento);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar medicamento", error: (error as Error).message });
    }
});

// Rota para remover medicamento por id, somente o usuário criador pode remover
medicamentosRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const medicamento = await medicamentoRepository.findOne({ where: { id: Number(id) }, relations: ["user"] });

        if (!medicamento) {
            return res.status(404).json({ message: "Medicamento não encontrado" });
        }

        if (medicamento.user.id !== userId) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        await medicamentoRepository.remove(medicamento);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover medicamento", error: (error as Error).message });
    }
});


export default medicamentosRouter;