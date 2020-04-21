const bd = require("./bd")

const Post = bd.sequelize.define("postagens",{
    titulo: {
        type: bd.Sequelize.STRING
    },
    conteudo: {
        type: bd.Sequelize.TEXT
    }
})

//Executar na 1 vez pra criar a tabela
//Post.sync({force: true})

module.exports = Post