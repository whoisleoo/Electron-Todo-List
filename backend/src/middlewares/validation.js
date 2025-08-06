

// =============================================================================================
//                                   VALIDAÇÃO DE EMAIL
// =============================================================================================

export const validarEmail = function (email){
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email);
}

// =============================================================================================
//                                   MIDDLWARE DE REGISTRO
// =============================================================================================

export const validarRegistro = function (req, res, next){
    const { username, email, senha, confSenha } = req.body
    const erros = []; 

    if(!email) erros.push("Email é obrigatório.");
    if(!senha) erros.push("Senha é obrigatória.");
    if(senha && !confSenha) erros.push("Digite a senha novamente");
    if(!username) erros.push("Nome é obrigatório.");

    
    if(email && !validarEmail(email)){ 
        erros.push("Email deve ter um formato válido.");
    };
    if(senha && senha.length < 5 ){ 
        erros.push("Senha deve ter no minimo 5 digitos.")
    };
    if(username && username.trim().length < 3){
        erros.push("Nome deve ter pelo menos 3 digitos.")
    }; 
     if(senha !== confSenha) erros.push("Senhas não coincidem");
    if(erros.length > 0){
        return res.status(400).json({
            error: "Dados inválidos",
            erros_encontrados: erros
        })
    }
    next(); 
    };


// =============================================================================================
//                                   MIDDLWARE DE LOGIN
// =============================================================================================   

export const validarLogin = function (req, res, next){
    const { username, senha } = req.body;
    const erros = [];

    if(!username) erros.push("Nome é obrigatório.");
    if(!senha) erros.push("Senha é obrigatória.");

    if(senha && senha.length < 3){
        erros.push("Sua senha deve ter pelo menos 3 caracteres.")
    }

    if(erros.length > 0){
        return res.status(400).json({
            error: "Dados inválidos",
            erro_encontrado: erros
        })
    }
    next();
};


