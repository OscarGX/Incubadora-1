﻿$(document).ready(function () {
    const ddlMunicipio = $('#IdMunicipio');
    const ddlColonia = $('#IdColonia');
    const ddlUnidadAcademica = $('#IdUnidadAcademica');
    const ddlCarrera = $('#IdCarrera');
    const ddlCuatrimestre = $('#IdCuatrimestre');

    $('#IdEstado').change(function () {
        const idEstado = $(this).val();
        ddlMunicipio.prop('disabled', true);
        ddlMunicipio.find('option').remove();
        ddlColonia.prop('disabled', true);
        ddlColonia.find('option').remove();
        if (idEstado !== '' || idEstado.length > 0) {
            getMunicipiosByEstadoId(idEstado);
        }
    });

    ddlMunicipio.change(function () {
        const idMunicipio = $(this).val();
        if (idMunicipio === '' || idMunicipio.length === 0) {
            ddlColonia.prop('disabled', true);
            ddlColonia.find('option').remove();
        } else {
            getColoniasByMunicipioId(idMunicipio);
        }
    });

    $('#IntOcupacion').change(function () {
        const idOcupacion = $(this).val();
        if (idOcupacion === '' || idOcupacion.length === 0) {
            ddlUnidadAcademica.prop('disabled', true);
            ddlCarrera.prop('disabled', true);
            ddlCarrera.find('option').remove();
            ddlCuatrimestre.prop('disabled', true);
        } else if (idOcupacion === '1') {
            ddlUnidadAcademica.prop('disabled', false);
        } else {
            ddlUnidadAcademica.prop('disabled', true);
            ddlCarrera.prop('disabled', true);
            ddlCarrera.find('option').remove();
            ddlCuatrimestre.prop('disabled', true);
        }
    });

    ddlUnidadAcademica.change(function () {
        const idUnidadAcademica = $(this).val();
        if (idUnidadAcademica === '' || idUnidadAcademica.length === 0) {
            ddlCarrera.prop('disabled', true);
            ddlCuatrimestre.prop('disabled', true);
        } else {
            getCarrerasByUnidadAcademicaId(idUnidadAcademica);
        }
    });

    ddlCarrera.change(function () {
        const idCarrera = $(this).val();
        ddlCuatrimestre.prop('disabled', (idCarrera === '' || idCarrera.length === 0));
    });

    const getMunicipiosByEstadoId = (estadoId) => {
        $.ajax({
            type: "Get",
            url: `/Municipio/GetMunicipiosByEstadoId?idEstado=${estadoId}`,
            dataType: "Json",
            success: function (data) {
                ddlMunicipio.find('option').remove();
                const defaultOption = `<option value="">Selecciona un municipio</option>`;
                ddlMunicipio.append(defaultOption);
                $.each(data, (i) => {
                    const option = `<option value="${data[i].Id}">${data[i].StrNombre}</option>`;
                    ddlMunicipio.append(option);
                });
                ddlMunicipio.prop('disabled', false);
            },
            error: function (xhr, textStatus, errorThrown) {
                //toastr.error("No se pudo procesar la información de forma correcta, intenta de nuevo por favor", "Campaña dice", { timeOut: 1000, closeButton: true });
                console.log(textStatus);
            }
        });
    };

    const getColoniasByMunicipioId = (municipioId) => {
        $.ajax({
            type: "Get",
            url: `/Colonia/GetColoniasByMunicipioId?idMunicipio=${municipioId}`,
            dataType: "Json",
            success: function (data) {
                ddlColonia.find('option').remove();
                const defaultOption = `<option value="">Selecciona una colonia</option>`;
                ddlColonia.append(defaultOption);
                $.each(data, (i) => {
                    const option = `<option value="${data[i].Id}">${data[i].StrNombre}</option>`;
                    ddlColonia.append(option);
                });
                ddlColonia.prop('disabled', false);
            },
            error: function (xhr, textStatus, errorThrown) {
                //toastr.error("No se pudo procesar la información de forma correcta, intenta de nuevo por favor", "Campaña dice", { timeOut: 1000, closeButton: true });
                console.log(textStatus);
            }
        });
    };

    const getCarrerasByUnidadAcademicaId = (unidadAcademicaId) => {
        $.ajax({
            type: "Get",
            url: `/Carrera/GetCarrerasByUnidadAcademicaId?unidadAcademicaId=${unidadAcademicaId}`,
            dataType: "Json",
            success: function (data) {
                ddlCarrera.find('option').remove();
                const defaultOption = `<option value="">Selecciona una carrera</option>`;
                ddlCarrera.append(defaultOption);
                $.each(data, (i) => {
                    const option = `<option value="${data[i].Id}">${data[i].StrValor}</option>`;
                    ddlCarrera.append(option);
                });
                ddlCarrera.prop('disabled', false);
            },
            error: function (xhr, textStatus, errorThrown) {
                //toastr.error("No se pudo procesar la información de forma correcta, intenta de nuevo por favor", "Campaña dice", { timeOut: 1000, closeButton: true });
                console.log(textStatus);
            }
        });
    };
});