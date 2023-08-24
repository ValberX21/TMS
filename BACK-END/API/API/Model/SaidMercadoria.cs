using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class SaidMercadoria
    {
        public int ID { get; set; }
        public string MERCAD_NOME { get; set; }
        public int QUANTIDADE { get; set; }
        public DateTime DATA { get; set; }
    }
}
