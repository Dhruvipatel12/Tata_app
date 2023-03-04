console.log("Hello This is Start of Desk file pls Consider it")
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        console.log("This is inner jQuery")
        console.log("Hello This is event Listener")
        let user = frappe.session.user
        // alert(user)
        frappe.call({
            method: "urja_app.api.login1", 
            args:{
                "user": user,
            }
            }).then(records => {
                var role = records["role"]
                var supplier_name = records["supplier"]
                alert("Your Role is ",role)
                if (role=="Vendor"){
                    // alert("Hehehehhehehehehehehe")
                    alert("Your Supplier name is ",supplier_name)
                    // alert(`Fifteen is ${supplier_name}.`);
                    let navbar = document.querySelector(".navbar-collapse")

                    let report = document.createElement('a')
                    report.href="https://migoostage.frappe.cloud/app/query-report/Compliance%20Report"
                    report.innerText = "Compliance Report"
                    report.style = "margin-left:50px; font-weight: 600;"
                    navbar.prepend(report)
                    
                    let dashboard = document.createElement('a')
                    dashboard.href="https://migoostage.frappe.cloud/app/dashboard-view/Equipment%20Dashboard"
                    dashboard.innerText = "Dashboard"
                    dashboard.style = "margin-left:50px; font-weight: 600;"
                    navbar.prepend(dashboard)

                    let equipment = document.createElement('a')
                    equipment.href="https://migoostage.frappe.cloud/app/item"
                    equipment.innerText = "Equipment"
                    equipment.style = "margin-left:50px; font-weight: 600;"
                    navbar.prepend(equipment)
            
                    let supplier = document.createElement('a')
                    supplier.href=`https://migoostage.frappe.cloud/app/supplier/${supplier_name}`
                    supplier.innerText = "Your details"
                    supplier.style = "margin-left:550px; font-weight: 600;"
                    navbar.prepend(supplier)

                    $('#navbar-breadcrumbs').removeClass('d-sm-flex');
                    $('.page-actions').remove();
                    
                }
                else{
                    // alert("Nanananananannaanaaa")
                }
        })
    }
}
console.log("Hello This is End of Desk file pls Consider it")