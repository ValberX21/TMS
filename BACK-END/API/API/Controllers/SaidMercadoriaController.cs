using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaidMercadoriaController : Controller
    {
        private readonly IConfiguration _config;

        public SaidMercadoriaController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("SaidaMercadorias")]
        public JsonResult Post(SaidMercadoria saiMerc)
        {
            try
            {
                string queryCheckMercadoria = @"SELECT ID, MERCAD_NOME, QUANTIDADE FROM MERCADORIA_ENTRADA";
                string sqlDataSource1 = _config.GetConnectionString("DbParams");
                SqlDataReader reader1, reader2, reader3;

                using (SqlConnection con = new SqlConnection(sqlDataSource1))
                {
                    con.Open();
                    using (SqlCommand command = new SqlCommand(queryCheckMercadoria, con))
                    {
                        reader1 = command.ExecuteReader();                        

                        while (reader1.Read())
                        {
                            int MERCAD_ID = int.Parse(reader1["ID"].ToString());
                            string MERCAD_NOME = reader1["MERCAD_NOME"].ToString();
                            int MERCAD_QUANT = int.Parse(reader1["QUANTIDADE"].ToString());
                           
                     
                            if (saiMerc.MERCAD_NOME == MERCAD_NOME)
                            {
                                if(saiMerc.QUANTIDADE > MERCAD_QUANT)
                                {
                                    return new JsonResult("Quantidade não condiz com o estoque");
                                }
                                else
                                {
                                    //INSERE REGISTRO DE SAIDA DA MERCADORIA
                                    string registroSaida = @"INSERT INTO MERCADORIA_SAIDA (MERCAD_NOME  , QUANTIDADE , DATA )
                                                 VALUES (@MERCAD_NOME ,@QUANTIDADE ,@DATA)";

                                    DataTable tb2 = new DataTable();                                    
                                                                        
                                    using (SqlCommand command2 = new SqlCommand(registroSaida, con))
                                    {
                                        command2.Parameters.AddWithValue("@MERCAD_NOME", saiMerc.MERCAD_NOME);
                                        command2.Parameters.AddWithValue("@QUANTIDADE", saiMerc.QUANTIDADE);
                                        command2.Parameters.AddWithValue("@DATA", DateTime.Now);

                                        reader1.Close();
                                        reader2 = command2.ExecuteReader();
                                        tb2.Load(reader2);
                                        reader2.Close();
                                        con.Close();
                                    }


                                    //ATUALIZA QUANTIDADE NA TABELA DE ENTRADA
                                    string atualizaEstoque = @"UPDATE MERCADORIA_ENTRADA SET QUANTIDADE = @QUANTIDADE WHERE ID = @ID";

                                    DataTable tb3 = new DataTable();
                                    string sqlDataSource = _config.GetConnectionString("DbParams");
                                    
                                    using (SqlConnection con3 = new SqlConnection(sqlDataSource))
                                    {
                                        con.Open();
                                        using (SqlCommand command3 = new SqlCommand(atualizaEstoque, con))
                                        {
                                            command3.Parameters.AddWithValue("@ID", MERCAD_ID);
                                            command3.Parameters.AddWithValue("@QUANTIDADE",  MERCAD_QUANT - saiMerc.QUANTIDADE);

                                            reader3 = command3.ExecuteReader();
                                            tb3.Load(reader3);
                                            reader3.Close();
                                            con.Close();
                                        }
                                    }
                                }
                                return new JsonResult("Saida de mercadoria feita com sucesso");                                
                            }                            
                        }
                        reader1.Close();
                        return new JsonResult("Mercadoria não cadastrada");
                    }
                }               
            }
            catch (Exception e)
            {
                return new JsonResult("DEU ERRO - " + e);
            }
        }   

        [HttpGet]
        [Route("MercadoriasCadastradas")]
        public JsonResult Get()
        {
            string query = @"SELECT ID, MERCAD_NOME FROM MERCADORIA_ENTRADA";
            DataTable tb = new DataTable();
            string sqlDataSource = _config.GetConnectionString("DbParams");
            SqlDataReader reader;

            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand command = new SqlCommand(query, con))
                {
                    reader = command.ExecuteReader();
                    tb.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult(tb);
        }

    }
}
