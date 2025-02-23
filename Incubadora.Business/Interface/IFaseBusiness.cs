﻿using Incubadora.Domain;
using System.Collections.Generic;

namespace Incubadora.Business.Interface
{
    public interface IFaseBusiness
    {
        /// <summary>
        /// Este método consulta todas las bases del catálogo de la bd.
        /// </summary>
        /// <returns>Una lista del catálogo fases </returns>
        List<FaseDomainModel> GetFases();
    }
}
