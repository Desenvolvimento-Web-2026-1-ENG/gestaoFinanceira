import { Router, Request, Response } from "express";
import { CategoriaFactory } from "@factories/CategoriaFactory";

const router = Router();
const controller = CategoriaFactory.criarController();


/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get("/categorias", (req, res) => controller.listar(req, res));

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarCategoriaDTO'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *       400:
 *         description: Já existe uma categoria com este nome
 */
router.post("/categorias", (req, res) => controller.criar(req, res));


/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Exclui uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Excluído com sucesso (No Content)
 *       400:
 *         description: Não é possível excluir a categoria pois existem tarefas vinculadas a ela
 *       404:
 *         description: Categoria não encontrada
 */
router.delete("/categorias/:id", (req, res) => controller.excluir(req, res));

export default router;
