let menu = [];

class MenuController {
  index(req, res) {
    return res.status(200).json(menu);
  }

  create(req, res) {
    console.log("Recebendo dados:", req.body);
    try {
      const { info } = req.body;
      if (!info) {
        return res.status(400).json({ error: "O campo 'info' é obrigatório" });
      }

      const id = menu.length > 0 ? menu[menu.length - 1].id + 1 : 1;
      const novoItem = { id, info };
      menu.push(novoItem);

      console.log("Item criado:", novoItem);
      return res.status(201).json(novoItem);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default new MenuController();
