import { questionsData } from '../data/questionsData';
import { ResourceEstimates as ResourceType, AnswerState as AnswerType, Weight } from './types';

export type ResourceEstimates = ResourceType;
export type AnswerState = AnswerType;

export const calculateResources = (answers: AnswerState): ResourceEstimates => {
  let cpu = 2;
  let ram = 4;
  let disk = 50;

  Object.values(answers).forEach(answer => {
    if (answer && questionsData.weights[answer as keyof typeof questionsData.weights]) {
      const weight = questionsData.weights[answer as keyof typeof questionsData.weights] as Weight;
      cpu += weight.cpu;
      ram += weight.ram;
      disk += weight.disk;
    }
  });

  return { cpu, ram, disk };
};

export const generateCSV = (answers: AnswerState, resources: ResourceEstimates): void => {
  // Import dinamicamente
  import('xlsx').then((XLSX) => {
    // Criar uma nova planilha
    const wb = XLSX.utils.book_new();
    
    // Dados da tabela: título + cabeçalhos + conteúdo
    // Vamos expandir para 6 colunas: Categoria, Pergunta, Resposta, Espaço em branco, Recurso, Quantidade
    const data = [
      ['QUESTIONÁRIO – Estimativa de Hardware', '', '', '', 'ESTIMATIVA CALCULADA', ''], // Título e título da estimativa
      ['Categoria', 'Pergunta', 'Resposta', '', 'Recurso', 'Quantidade'], // Cabeçalhos
      // Adicionar as perguntas e respostas, com as informações de estimativa nas colunas da direita
      [questionsData.questions[0]?.category || '', questionsData.questions[0]?.question || '', answers[questionsData.questions[0]?.id] || '', '', 'CPU (cores)', resources.cpu],
      [questionsData.questions[1]?.category || '', questionsData.questions[1]?.question || '', answers[questionsData.questions[1]?.id] || '', '', 'RAM (GB)', resources.ram],
      [questionsData.questions[2]?.category || '', questionsData.questions[2]?.question || '', answers[questionsData.questions[2]?.id] || '', '', 'Disco (GB)', resources.disk],
      // Continuar com as demais perguntas (quando tiver mais recursos, ocupar colunas vazias)
      ...questionsData.questions.slice(3).map((q) => [q.category, q.question, answers[q.id] || '', '', '', ''])
    ];
    
    // Criar a planilha com os dados
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Definir mesclagem para o título principal
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }); // Mescla título principal (A1:C1)
    ws['!merges'].push({ s: { r: 0, c: 4 }, e: { r: 0, c: 5 } }); // Mescla título da estimativa (E1:F1)
    
    // Aplicar estilos de forma mais robusta
    
    // Estilo para o título principal
    const titleCell = ws['A1'];
    if (titleCell) {
      titleCell.s = {
        font: { bold: true, color: { rgb: 'FFFFFF' } }, 
        fill: { fgColor: { rgb: '4A5568' } }, // cinza escuro
        alignment: { horizontal: 'center', vertical: 'center' },
        border: {
          top: { style: 'thin', color: { rgb: 'D1D5DB' } },
          bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
          left: { style: 'thin', color: { rgb: 'D1D5DB' } },
          right: { style: 'thin', color: { rgb: 'D1D5DB' } }
        }
      };
    }
    
    // Estilo para título da estimativa
    const estimativaTitleCell = ws['E1'];
    if (estimativaTitleCell) {
      estimativaTitleCell.s = {
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '4A5568' } }, // cinza escuro
        alignment: { horizontal: 'center', vertical: 'center' },
        border: {
          top: { style: 'thin', color: { rgb: 'D1D5DB' } },
          bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
          left: { style: 'thin', color: { rgb: 'D1D5DB' } },
          right: { style: 'thin', color: { rgb: 'D1D5DB' } }
        }
      };
    }
    
    // Estilo para os cabeçalhos da tabela de perguntas (linha 1, colunas A-C)
    for (let C = 0; C <= 2; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: C });
      const cell = ws[cellAddress];
      if (cell) {
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'DBEAFE' } }, // azul claro
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'D1D5DB' } },
            bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
            left: { style: 'thin', color: { rgb: 'D1D5DB' } },
            right: { style: 'thin', color: { rgb: 'D1D5DB' } }
          }
        };
      }
    }
    
    // Estilo para os cabeçalhos da estimativa (linha 1, colunas E-F)
    for (let C = 4; C <= 5; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: C });
      const cell = ws[cellAddress];
      if (cell) {
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'DBEAFE' } }, // azul claro
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'D1D5DB' } },
            bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
            left: { style: 'thin', color: { rgb: 'D1D5DB' } },
            right: { style: 'thin', color: { rgb: 'D1D5DB' } }
          }
        };
      }
    }
    
    // Estilo para as linhas de conteúdo (perguntas e respostas e estimativa)
    for (let R = 2; R < data.length; R++) {
      // Alternar cor de fundo para linhas pares
      const isEvenRow = (R - 2) % 2 === 0; // Alternar a partir da primeira linha de conteúdo
      
      // Aplicar estilos para colunas A-C (perguntas)
      for (let C = 0; C <= 2; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellAddress];
        
        if (cell && cell.v !== undefined) { // Apenas células com conteúdo
          let horizontalAlign = 'left'; // Padrão para pergunta e resposta
          if (C === 0) horizontalAlign = 'center'; // Categoria centralizada
          
          cell.s = {
            fill: isEvenRow ? { fgColor: { rgb: 'F9FAFB' } } : { fgColor: { rgb: 'FFFFFF' } }, // Alternância de cor
            alignment: { horizontal: horizontalAlign, vertical: 'top' },
            border: {
              top: { style: 'thin', color: { rgb: 'D1D5DB' } },
              bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
              left: { style: 'thin', color: { rgb: 'D1D5DB' } },
              right: { style: 'thin', color: { rgb: 'D1D5DB' } }
            }
          };
        }
      }
      
      // Aplicar estilos para colunas E-F (estimativa)
      for (let C = 4; C <= 5; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellAddress];
        
        if (cell && cell.v !== undefined) { // Apenas células com conteúdo
          cell.s = {
            fill: isEvenRow ? { fgColor: { rgb: 'F9FAFB' } } : { fgColor: { rgb: 'FFFFFF' } }, // Alternância de cor
            alignment: { horizontal: 'center', vertical: 'center' },
            border: {
              top: { style: 'thin', color: { rgb: 'D1D5DB' } },
              bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
              left: { style: 'thin', color: { rgb: 'D1D5DB' } },
              right: { style: 'thin', color: { rgb: 'D1D5DB' } }
            }
          };
        }
      }
    }
    
    // Ajustar largura das colunas
    ws['!cols'] = [
      { wch: 15 }, // Largura para Categoria
      { wch: 50 }, // Largura para Pergunta
      { wch: 15 }, // Largura para Resposta
      { wch: 5 },  // Espaço em branco
      { wch: 15 }, // Largura para Recurso
      { wch: 15 }  // Largura para Quantidade
    ];
    
    // Adicionar a planilha ao workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Questionário');
    
    // Gerar e baixar o arquivo
    XLSX.writeFile(wb, 'questionario_hardware.xlsx');
  });
};

export const getAllAnswered = (answers: AnswerState): boolean => {
  return Object.values(answers).every(a => a !== '');
};