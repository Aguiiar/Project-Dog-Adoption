
export const getDogs = async () =>{
    const response = await fetch("https://localhost:7022/api/dog");

    if(!response.ok){
        throw new Error ("Error find dogs");
    }

    return await response.json();
}


export const sendContact = async (email,message) =>{
  const response = await fetch("https://localhost:7170/api/contact",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                message
            })
        });

         if(!response.ok){
        throw new Error("Erro ao enviar mensagem");
    }

    return await response.json();
}

export const saveUser = async (name,email,password,confirmPassword) => {
    const response = await fetch("https://localhost:7266/api/user/register",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password,
            confirmPassword

        })
    });
    if(!response.ok){
        throw new Error("Error Save User")
    }

    return await response.json();
}

export const login = async (email, password)=>{
    const response = await fetch("https://localhost:7266/api/user/login", {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    });
    if(!response.ok){
        throw new Error("Error Login");
    }

    return await response.json();
}



 export const getLogginUser = async () =>{


 const token = localStorage.getItem("token");
 const response = await fetch('https://localhost:7266/api/user/logado',{
    method:"GET",
    headers:{
        Authorization: `Bearer ${token}`
    }
 });
 console.log("Status:", response.status);

   const data = await response.json();
    console.log("Resposta:", data);
if(!response.ok){
    throw new Error("Erro ao buscar usuario");
}

return data;
}



export const sendEmailLinkResetPassword = async (email) =>{
    const response = await fetch('https://localhost:7266/api/user/sendEmailLinkResetPassword',{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email
        })
    });

    if(!response.ok){
        throw new Error("Erro ao enviar e-mail de recuperação");
    }

    return await response.json();
}



export const resetPassword = async (token, newPassword)=>{
    const response = await fetch("https://localhost:7266/api/user/resetPassword",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            token,newPassword
        })
    });
    if (!response.ok){
        throw new Error("Erro ao redefinir senha")
    }

    return await response.json();
}