import db from './db.js';
import express, { raw } from 'express'
import cors from 'cors'
import crypto from 'crypto-js'

const app = express();
app.use(cors());
app.use(express.json());


app.post('/usuario', async (req, resp) => {
    try{
        let { nome, login, senha, img } = req.body;

        let existe = await db.tb_usuario.findOne(
            { 
                where: 
                    { 
                        nm_usuario: nome,
                        ds_login: login
                    } 
            })
        
        if(existe != null)
            return resp.send({ erro: 'Algum usuario ja está usando essas informações !!' })

        let r = await db.tb_usuario.create({
            nm_usuario: nome,
            ds_login: login,
            ds_senha: crypto.SHA256(senha).toString(crypto.enc.Base64),
            img_usuario: img
        })

        resp.send(r)
    } catch (e){
        resp.send({ erro: `${e.toString()}` })
    }
})


app.get('/usuario', async (req, resp) => {
    try{
        let r = await db.tb_usuario.findAll({ order: [['id_usuario', 'desc']] });
        resp.send(r);
    } catch (e){
        resp.send({ erro: `${e.toString()}` })
    }
})

app.post('/login', async (req, resp) =>{
    try{
        let { login, senha } = req.body;
        let crypto = crypto.SHA256(senha).toString(crypto.enc.Base64);

        let r = await db.tb_usuario.findOne(
            {
                where: {
                    ds_login: login,
                    ds_senha: crypto
                },
                raw: true
            })

        if(r == null)
            return resp.send({ erro: "Credenciais Invalidas !!" })

        delete r.ds_senha;
        resp.send(r);    
    } catch (e){
        resp.send({ erro: `${e.toString()}` })
    }
})

app.get('/produto', async (req, resp) =>{
    try{
        let r = await db.tb_produto.findAll({ order: [['id_produto', 'desc']] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: `${e.toString()}` })
    }    
})

app.post('/produto', async (req, resp) =>{
    try{
        let { nome, categoria, precoDE, precoPOR, avaliacao, 
              estoque, descricao, imagem } = req.body;

        if(nome == "" || categoria == "" || descricao == "" || imagem == "")
                return resp.send({ erro: "É obrigatório preencher todos os campos !!"})
        
        if(avaliacao <= 0 || estoque <= 0 || precoDE <= 0 || precoPOR <= 0)
            return resp.send({ erro: "É obrigatório passar valores maiores que zero !!" })  
            
        if(isNaN(precoDE) || isNaN(precoPOR) || isNaN(avaliacao)|| isNaN(estoque)){
            return resp.send({ erro: "Não é possivel usar textos em campos de números !!"})    
        }

        if(!isNaN(nome) || !isNaN(categoria) || !isNaN(imagem) || !isNaN(descricao))
            return resp.send({ erro: "Não é possivel usar números em campos de texto !!" })

        let conferir = await db.tb_produto.findOne({ where: { nm_produto: nome }})
        if(conferir != null)
            return resp.send({ erro: "Esse produto ja existe !!" })

        let r = await db.tb_produto.create({
            nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precoDE,
            vl_preco_por: precoPOR,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: true,
            dt_inclusao: new Date()
        })  
        
        resp.send(r);
    } catch (e) {
        resp.send({ erro: `${e.toString()}` })
    }
})

app.put('/produto/:id', async (req, resp) =>{
    try{
        let { nome, categoria, precoDE, precoPOR, avaliacao, 
            estoque, descricao, imagem } = req.body;
           
        let { id } = req.params

        if(nome == "" || categoria == "" || descricao == "" || imagem == "")
                return resp.send({ erro: "É obrigatório preencher todos os campos !!"})
        
        if(avaliacao <= 0 || estoque <= 0 || precoDE <= 0 || precoPOR <= 0)
            return resp.send({ erro: "É obrigatório passar valores maiores que zero !!" })  
            
        if(isNaN(precoDE) || isNaN(precoPOR) || isNaN(avaliacao)|| isNaN(estoque)){
            return resp.send({ erro: "Não é possivel usar textos em campos de números !!"})    
        }

        if(!isNaN(nome) || !isNaN(categoria) || !isNaN(imagem) || !isNaN(descricao))
            return resp.send({ erro: "Não é possivel usar números em campos de texto !!" })

        let r = await db.tb_produto.update({
            nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precoDE,
            vl_preco_por: precoPOR,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: true,
            dt_inclusao: new Date()
        },
        {
            where: { id_produto: id }
        })

        resp.sendStatus(200);
        
    } catch (e) {
        resp.send({ erro: `${e.toString()}` })
    }
})

app.delete('/produto/:id', async (req, resp) =>{
    try{
        let r = await db.tb_produto.destroy({ where: { id_produto: req.params.id } })
        resp.sendStatus(200)
    } catch (e) {
        resp.send({ erro: `${e.toString()}` })
    }
})


app.listen(process.env.PORT, 
           x => console.log(`Server up at port ${process.env.PORT}`))
