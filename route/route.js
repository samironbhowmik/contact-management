const userModel = require("../model/user");

const route = require("express").Router();

//POST - Create a new Contact
route.post("/v1/contacts", async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    // console.log(firstname,lastname,email,phone);
    const user = await userModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
    });
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

//GET - List all contacts
route.get("/v1/contacts", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.find({ id: id });
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

//GET - Get a specific contact
route.get("/v1/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const contact = await userModel.findOne({ id: id });

    if (!contact) {
      return res.status(400).json({
        message: "Thers is no contact with that id",
      });
    }
    res.status(200).json({
      status: "success",
      // user,
      contact,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
});

//POST - Delete a specific contact
route.delete("/v1/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const contact = await userModel.findOneAndDelete({ id: id });
    if(contact.contactCount ==0)
    {
        return res.status(400).json({
            status:"failed"
        })
    }

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
        status:"failed",
        message:error.message
    })
  }
});

//PUT - Update a specific contact
route.put("/v1/contacts/:id", async(req,res)=>{
    try {
        const {id} = req.params.id;
        const update = await userModel.findOneAndUpdate({id:id})
        if(update == null)
        {
            return res.status(400).json({
                status:"failed"
            })
        }
        res.status(200).json({
            status:"success",
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

//PUT - Update a specific contact
route.put("/v1/contacts/:id", async(req,res)=>{
    try {
        const {id} = req.params.id;
        const {firstname} = req.body
        const contact = await userModel.findOneAndUpdate({firstname:firstname})
        const update = await userModel.findOneAndUpdate({id:id})
        if(update == null)
        {
            return res.status(400).json({
                status:"failed"
            })
        }
        res.status(200).json({
            status:"success",
            contact
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = route;
