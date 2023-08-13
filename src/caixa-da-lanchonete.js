class CaixaDaLanchonete {
    cardapio = [
        {
            id: 'cafe',
            descricao: 'Café',
            valor: 3.00
        },
        {
            id: 'chantily',
            descricao: 'Chantily (extra do Café)',
            valor: 1.50
        },
        {
            id: 'suco',
            descricao: 'Suco Natural',
            valor: 6.20
        },
        {
            id: 'sanduiche',
            descricao: 'Sanduíche',
            valor: 6.50
        },
        {
            id: 'queijo',
            descricao: 'Queijo (extra do Sanduíche)',
            valor: 2.00
        },
        {
            id: 'salgado',
            descricao: 'Salgado ',
            valor: 7.25
        },
        {
            id: 'combo1',
            descricao: '1 Suco e 1 Sanduíche ',
            valor: 9.50
        },
        {
            id: 'combo2',
            descricao: '1 Café e 1 Sanduíche',
            valor: 7.50
        }
    ]

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (this.ehVazio(itens)) return "Não há itens no carrinho de compra!";
        if (!this.validaMetodoDePagamento(metodoDePagamento)) return "Forma de pagamento inválida!";

        let arrPedidoObj = this.transformaPedidoEmObjeto(itens);

        if (!this.verificaDadosDosPedidos(arrPedidoObj)) return "Item inválido!";
        if (this.validaQuantidadeDeItens(arrPedidoObj)) return "Quantidade inválida!";
        if (!this.validaPedidoExtra(arrPedidoObj, 'chantily', 'cafe') || !this.validaPedidoExtra(arrPedidoObj, 'queijo', 'sanduiche'))
            return "Item extra não pode ser pedido sem o principal";

        let total = 0;

        arrPedidoObj.forEach(item => {
            total += item.qtd * this.cardapio.find(e => e.id === item.id).valor;
        })

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }
        return `R$ ${total.toFixed(2).toString().replace('.', ',')}`;
    }


    validaMetodoDePagamento(metodoDePagamento) {
        const metodosDePagamentos = ['dinheiro', 'debito', 'credito'];
        return metodosDePagamentos.includes(metodoDePagamento);
    }

    ehVazio(itens) {
        return itens.length === 0 ? true : false;
    }


    validaPedidoExtra(itens, extra, pedidoPrincipal) {
        const possuiExtra = this.buscaItemPorId(extra, itens);
        const possuiPrincipal = this.buscaItemPorId(pedidoPrincipal, itens);

        return possuiExtra && !possuiPrincipal ? false : true;
    }

    validaQuantidadeDeItens(itens) {
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].qtd === 0) return true;
        }
        return false;
    }

    verificaDadosDosPedidos(itens) {
        const integridadeDados = this.verificaQtdDadosDoPedido(itens);
        const exiteNoCardapio = this.verificaSeExiteNoCardapio(itens);

        return (!integridadeDados || !exiteNoCardapio) ? false : true;

    }

    verificaSeExiteNoCardapio(itens) {
        for (let i = 0; i < itens.length; i++) {
            if (!this.buscaCardapio(itens[i].id)) return false;
        }
        return true;
    }

    buscaCardapio(idPedido) {
        for (let i = 0; i < this.cardapio.length; i++) {
            if (this.cardapio[i].id === idPedido) return true;
        }
        return false;
    }

    buscaItemPorId(idItem, itens) {
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].id === idItem) return true;
        }
        return false;
    }

    verificaQtdDadosDoPedido(itens) {
        for (let index = 0; index < itens.length; index++) {
            if (Object.keys(itens[index]).length !== 2) return false
        }
        return true;
    }

    transformaPedidoEmObjeto(itens) {
        if (!this.ehVazio(itens)) {
            const arrayDeObjetos = itens.map(item => {
                let arr = item.split(',');
                return arr.length === 2 ? {id: arr[0], qtd: parseInt(arr[1])} : {};
            })
            return arrayDeObjetos;
        }
    }


}


export { CaixaDaLanchonete };