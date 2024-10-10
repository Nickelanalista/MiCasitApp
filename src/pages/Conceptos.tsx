import React from 'react';

const Conceptos: React.FC = () => {
  const conceptos = [
    {
      titulo: "Unidad de Fomento (UF)",
      descripcion: "La Unidad de Fomento es una unidad de cuenta reajustable de acuerdo con la inflación. Se utiliza ampliamente en el mercado inmobiliario chileno para valorar propiedades y préstamos hipotecarios."
    },
    {
      titulo: "Pie",
      descripcion: "Es el monto inicial que se paga al comprar una propiedad. Generalmente se expresa como un porcentaje del valor total de la vivienda."
    },
    {
      titulo: "Tasa de interés anual",
      descripcion: "Es el costo del préstamo expresado como un porcentaje anual. Determina cuánto pagarás en intereses por el dinero prestado."
    },
    {
      titulo: "Plazo del crédito",
      descripcion: "Es el período durante el cual se pagará el préstamo hipotecario. En Chile, los plazos más comunes son de 20, 25 y 30 años."
    },
    {
      titulo: "Dividendo",
      descripcion: "Es la cuota mensual que se paga por el crédito hipotecario. Incluye una parte del capital prestado y los intereses."
    },
    {
      titulo: "Carga anual equivalente (CAE)",
      descripcion: "Es un indicador que representa el costo total del crédito, incluyendo la tasa de interés, comisiones y otros gastos asociados."
    },
    {
      titulo: "Hipoteca",
      descripcion: "Es un derecho real que grava un inmueble para garantizar el pago de una deuda. En caso de incumplimiento, el acreedor puede solicitar la venta del inmueble para recuperar el préstamo."
    },
    {
      titulo: "Tasación",
      descripcion: "Es el proceso de valoración de una propiedad realizado por un profesional. Es necesario para determinar el monto máximo del crédito hipotecario."
    },
    {
      titulo: "Subsidio habitacional",
      descripcion: "Es una ayuda económica que entrega el Estado chileno a las familias para la compra de una vivienda. Existen diferentes tipos según las características y necesidades de los beneficiarios."
    },
    {
      titulo: "Escritura",
      descripcion: "Es el documento legal que formaliza la compraventa de una propiedad. Debe ser firmada ante notario y posteriormente inscrita en el Conservador de Bienes Raíces."
    },
    {
      titulo: "Índice de Precios al Consumidor (IPC)",
      descripcion: "Es un indicador económico que mide la variación de los precios de una canasta de bienes y servicios representativa del consumo de los hogares. Se utiliza para calcular la inflación."
    },
    {
      titulo: "Tasa Política Monetaria (TPM)",
      descripcion: "Es la tasa de interés que fija el Banco Central de Chile para regular la liquidez del mercado financiero. Influye en las tasas de interés de los créditos hipotecarios."
    },
    {
      titulo: "Leasing habitacional",
      descripcion: "Es un sistema de financiamiento que permite arrendar una vivienda con opción de compra al final del contrato. Es una alternativa al crédito hipotecario tradicional."
    },
    {
      titulo: "Seguro de desgravamen",
      descripcion: "Es un seguro obligatorio en los créditos hipotecarios que cubre el saldo de la deuda en caso de fallecimiento o invalidez total y permanente del deudor."
    },
    {
      titulo: "Refinanciamiento hipotecario",
      descripcion: "Es el proceso de reemplazar un crédito hipotecario existente por uno nuevo, generalmente con mejores condiciones de tasa de interés o plazo."
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Conceptos Inmobiliarios y Financieros</h2>
        <p className="text-gray-600 mb-6">
          Familiarízate con los términos clave del mercado inmobiliario y financiero chileno.
        </p>
        <div className="space-y-6">
          {conceptos.map((concepto, index) => (
            <div key={index} className="p-4 rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{concepto.titulo}</h3>
              <p className="text-gray-600">{concepto.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conceptos;