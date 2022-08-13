# Projeto APS

## Grupo

- Pedro Meira-Betmann (pm)
- João Placido da Silva Neto (jpsn)
- Lucas Yule Rocha de Melo Araujo (lyrma)
- Andrey Romeiro Moutelik de Aguiar (arma2)

## Proposta de Aplicação

Um sistema para ajudar agentes de saúde na marcação de consultas. Um chatbot acoplado ao telegram para que os pacientes sejam capazes de pedir a marcação de consultas, junto com informações dos horários possíveis e eventos da unidade de saúde. No lado da agente de saúde ela tem uma lista dos pedidos de marcação e as opções de dizer é foi possível marcar a consulta na data desejada pelo paciente e assim o bot manda a mensagem automaticamente confirmando a consulta e no caso de não conseguir marcar a consulta o bot manda uma mensagem avisando que não foi possível fazer a marcação para a data desejada.

## Especificação de casos de uso

- cadastrar paciente
O paciente utiliza o chat bot do telegram para passar as suas informações que serão guardadas num banco de dados de pacientes, tambem é checado se o paciente existe, caso nao exista o paciente é criado e o paciente recebe um email com uma key caso ele queira ver suas informacoes ou deletar suas informações
- consultar eventos
O paciente utiliza o chat bot para fazer um requisito de seus eventos futuros, primeiro é checado se o paciente existe, caso ele exista o pedido passa para a base de dados e é retornado uma lista de eventos do paciente
- consultar consultas(paciente)
O paciente utiliza o chat bot para fazer um requisito de suas futuras consultas, primeiro é checado se o paciente existe, caso ele exista o pedido passa para a base de dados e é retornado uma lista de consultas do paciente
- consultar pedidos de marcação(agente de saude)
O agente de saude após entrar na sua conta, ele pede uma lista das marcacoes que foram pedidas a ele, é retornado a ele uma lista interativa o qual ele interaje na parte de confirmar/rejeitar marcação
- efetuar login(saude)
O agente de saude insere seu usuario e senha, isso passa para o controlador que checa se essa conta existe e a senha está correta
- alterar senha(saude)
O agente de saude requisita uma mudança de senha e um email é enviado para ele com um codigo/site para mudar a sua senha
- pedir marcação de consulta
O paciente utiliza o chat bot para escolher o medico que ele quer ir e as horas disponiveis, ele seleciona o horario e o pedido vai para a base de dados de pedidos de marcação do agente de saude requisitado
- confirmar/rejeitar maracação
O agente de saude aceita/rejeita a marcação de consulta do paciente, caso seja aprovado o sistema envia uma mensagem de sucesso, caso contrario ele sera recusado
- remover paciente
O paciente requisita que suas informações sejam deletadas do sistema pelo caht bot usando uma key recebida por ele, a key tambem esta disponivel em um email enviado
- Alterar paciente
O paciente faz um requisito utilizando sua key que suas informaçoes sejam modificadas, é checada se a key esta correta e caso esteja o paciente pode mudar as suas informações
![image](https://drive.google.com/file/d/1szD3z0uyAX6sUy2PaxSeG7St4udAwdel/view?usp=sharing)
