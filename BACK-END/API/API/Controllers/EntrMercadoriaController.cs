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
    public class EntrMercadoriaController : Controller
    {
        private readonly IConfiguration _config;

        public EntrMercadoriaController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("NovaMercadorias")]
        public JsonResult Post(EntrMercadoria enMercad)
        {
            try
            {
                string query = @"INSERT INTO MERCADORIA_ENTRADA (MERCAD_NOME  , FABRICANTE , TIPO ,DESCRICAO  , DATA ,QUANTIDADE  ,LOCAL)
                                                         VALUES (@MERCAD_NOME ,@FABRICANTE ,@TIPO ,@DESCRICAO ,@DATA ,@QUANTIDADE, @LOCAL)";

                DataTable tb = new DataTable();
                string sqlDataSource = _config.GetConnectionString("DbParams");
                SqlDataReader reader;
                using (SqlConnection con = new SqlConnection(sqlDataSource))
                {
                    con.Open();
                    using (SqlCommand command = new SqlCommand(query, con))
                    {
                        command.Parameters.AddWithValue("@MERCAD_NOME", enMercad.MERCAD_NOME);
                        command.Parameters.AddWithValue("@FABRICANTE", enMercad.FABRICANTE);
                        command.Parameters.AddWithValue("@TIPO", enMercad.TIPO);
                        command.Parameters.AddWithValue("@DESCRICAO", enMercad.DESCRICAO);
                        command.Parameters.AddWithValue("@DATA", DateTime.Now);
                        command.Parameters.AddWithValue("@QUANTIDADE", enMercad.QUANTIDADE);
                        command.Parameters.AddWithValue("@LOCAL", enMercad.LOCAL);

                        reader = command.ExecuteReader();
                        tb.Load(reader);
                        reader.Close();
                        con.Close();
                    }
                }
                return new JsonResult("Mercadoria adicionada com sucesso");
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
            string query = @"SELECT MERCAD_NOME FROM MERCADORIA_ENTRADA";
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
