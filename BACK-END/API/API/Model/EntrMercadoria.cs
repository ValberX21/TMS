using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class EntrMercadoria
    {
        public int ID { get; set; }
        public string MERCAD_NOME { get; set; }
        public string FABRICANTE { get; set; }
        public string TIPO { get; set; }
        public string DESCRICAO { get; set; }
        public DateTime DATA { get; set; }
        public int QUANTIDADE { get; set; }
        public string LOCAL { get; set; }
    }
}
