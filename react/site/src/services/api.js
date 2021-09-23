import axios from 'axios'
const api = axios.create({
    baseURL: 'https://devstore-heroku.herokuapp.com'
})

export default class Api {

    async listar(){
        let r = await api.get('/produto');
        return r.data;
    }

    async inserir(nome, categoria, precoDE, precoPOR, avaliacao, estoque, descricao, imagem){
        let r = await api.post('/produto', {nome, categoria, precoDE, precoPOR, 
                                            avaliacao, estoque, descricao, imagem});
        return r.data;        
    }

    async alterar(id, nome, categoria, precoDE, precoPOR, avaliacao, estoque, descricao, imagem){
        let r = await api.put(`/produto/${id}`, {nome, categoria, precoDE, precoPOR, avaliacao, 
                                                estoque, descricao, imagem});
        return r.data;
    }

    async remover(id){
        let r = await api.delete(`/produto/${id}`);
        return r.data;
    }

    async login(login, senha){
        let r = await api.post('/login', { login, senha })
        return r.data;
    }

    async criarConta(nome, login, senha, img){
        let r = await api.post('/usuario', { nome, login, senha, img })
        return r.data;
    }
}