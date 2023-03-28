function checkForNull(field_name,var_field,errors){
    console.log(`before ${field_name}, ${var_field},${errors}`)
    if (!var_field) {
        errors.push(`${field_name} is null`);
        console.log(`${field_name} is null`);
    }
    console.log(`after ${field_name}, ${var_field},${errors}`)
}

function checkForValues(field_name,var_field,val_list,errors){
    if (!val_list.includes(var_field)) {
        errors.push(`${field_name} is invalid`);
        console.log(`${field_name} is invalid`);
    }
}

module.exports={checkForNull,checkForValues}