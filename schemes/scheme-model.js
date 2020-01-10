const db = require("../data/db-config")

function find() {
  return db("schemes").select()
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
}

function findSteps(scheme_id) {
  return db("steps as st")
    .join("schemes as sc", "sc.id", "st.scheme_id")
    .select("st.id", "st.step_number", "sc.scheme_name", "st.instructions")
    .where("scheme_id", scheme_id)

}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0])
    })
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count == 1) {
        return findById(id)
      }
    })
}

function remove(id) {
  return db("schemes")
    .where("id", id)
    .del()
}


module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
}