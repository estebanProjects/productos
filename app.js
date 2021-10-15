const fs = require("fs");

const writeFileAsync = async (arr) => {
  await fs.promises.writeFile(
    "./productos.txt",
    JSON.stringify(arr, null, 2),
    "utf-8"
  );
};

const readFileAsync = async (arr) => {
  let file = await fs.promises.readFile("./productos.txt", "utf-8");
  return file;
};

const truncateAsync = async (arr) => {
  await fs.promises.truncate(
    "./productos.txt", 0, function() {

    }
  )
}

class Contenedor {
  constructor() {
    this.productos = [];
  }

  async save(product) {
    let fileExits = await readFileAsync(); 
    if (fileExits && fileExits.length >= 0) {
      let dataFile = JSON.parse(fileExits);
      product.id = dataFile[dataFile.length - 1].id + 1;
      dataFile.push(product);
      this.productos = dataFile;
      writeFileAsync(this.productos);
      return product.id
    } else {
      product.id = 1;
      this.productos.push(product);
      writeFileAsync(this.productos);
      return product.id
    }
  }

  async getById(id) {
    let fileExits = await readFileAsync()

    if(fileExits) {
      let dataFile = JSON.parse(fileExits)

      for(let i=0; i<dataFile.length; i++) {
        if(dataFile[i].id == id) {
          return dataFile[i]
        }
      }
      return console.log(null + " :id no encontrado")
    }
  }

  async getAll() {
    let datos = await readFileAsync()

    if(datos) {
      let dataFile = JSON.parse(datos)
      return dataFile
    }
  }

  async deleteById(id) {
    let datos = await readFileAsync()
    
    if(datos) {
      let dataFile = JSON.parse(datos)
      for(let i=0; i<dataFile.length; i++) {
        if(dataFile[i].id == id) {
          dataFile.splice(i, 1)
          this.productos = dataFile
          truncateAsync()
          writeFileAsync(this.productos)
        }
      }
    }
  }

  async deleteAll() {
    this.productos = []
    truncateAsync()
  }

}

let contenedor = new Contenedor();

async function ejecutarPrograma() {
  // Save
  let id = await contenedor.save({                                                                                                                                                 
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                                         
  })
  console.log("id del elemento guardado: ",id) 

  let id2 = await contenedor.save({                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                                                                                                                                                                                  
  })
  console.log("id del elemento guardado: ",id2) 

  let id3 = await contenedor.save({                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                                                                                                               
  })
  console.log("id del elemento guardado: ",id3) 

  // Get by Id
 let obj = await contenedor.getById(1)
 console.log("El objeto con el id buscado:\n ",obj)
  // Get All
 let objAll = await contenedor.getAll()
 console.log("Todos los objetos del archivo:\n",objAll)
 // Delete By Id
 await contenedor.deleteById(7)

 // Delete All
 //  await contenedor.deleteAll() 
}

ejecutarPrograma()