        var totalFee = 0;
        var distance = parseFloat(document.getElementById("distance").value);
        var numStudents = parseInt(document.getElementById("students").value);
        var baseFee = 500;
        var flatTotalFee = 0;
        var minimumPerHeadFee = 250;
        var rzpConvenienceFee = 0;
        var freeDistance = 5;
        var extraFeePerKM = 10;
        var maxDistance = 20;
        var additionalFee = 0;
        var discountPercent = 10;
        var maxDiscountPercent = 45;
        var discount = 0;
        //Define Objects
        var ObjDiscountShowoff = document.getElementById("discountShowoff");
        var ObjperHeadFeeResult = document.getElementById("perHeadFeeResult");
        var ObjfeeResult = document.getElementById("feeResult");
        var ObjflatTotalFee = document.getElementById("flatTotalFee");
        var ObjtotalFee = document.getElementById("totalFee");
        var objBooking_btn = document.getElementById("booking_btn");
        ObjfeeResult.style.display = "none";

        function resetAll() {
            //Clear Divs
            ObjDiscountShowoff.style.display = "none";
            ObjperHeadFeeResult.style.display = "none";
            ObjfeeResult.style.display = "none";
            ObjflatTotalFee.style.display = "none";
            objBooking_btn.innerText = "Book";
            objBooking_btn.disabled = true;
            objBooking_btn.style.fontWeight = '500';
            //Reset variables
            baseFee = 500;
            flatTotalFee = 0;
            minimumPerHeadFee = 250;
            rzpConvenienceFee = 0;
            freeDistance = 5;
            extraFeePerKM = 10;
            additionalFee = 0;
            discountPercent = 10;
            maxDiscountPercent = 45;
            discount = 0;
        }

        function booking() {
            var rzpnotes = "NMC - Home Music session for " + numStudents + " student(s). Discount Percent: " + discountPercent.toFixed(0);
            //var rzpurl = "https://pages.razorpay.com/pl_NRI03gAVMKVOPE/view?session_fee=" + totalFee + "&notes=" + encodeURI(rzpnotes);
            var rzpurl = "/payment/home-session-rzp.html?session_fee=" + totalFee + "&notes=" + encodeURI(rzpnotes);
            window.open(rzpurl);
            rzpurl = "";
        }

        function calculateFee() {
            resetAll();
            distance = parseFloat(document.getElementById("distance").value);
            numStudents = parseInt(document.getElementById("students").value);

            // Input validation
            if (distance <= 0) {
                alert("Please enter a valid distance greater than 0.");
                resetAll();
                return; // Exit function if invalid distance
            }
            if (distance > maxDistance) {
                alert("That's too far! Call us and we'll see what we can do about it.");
                //window.open("https://links.nishaad.in/call"); 
                resetAll();
                return; // Exit function if large distance
            }

            if (numStudents <= 0) {
                alert("Please enter a valid number of students greater than 0.");
                resetAll();
                return;
                // Exit function if invalid number of students
            }
            if (distance > freeDistance) {
                //Calculating roundtrip charges
                additionalFee = Math.pow((distance - freeDistance), 1.1) * extraFeePerKM * 2;
            }

            // Apply discount based on number of students
            if (numStudents > 1) {
                //discount = baseFee * discountPercent * (numStudents - 1);
                //discountPercent = ((discountPercent) * ((numStudents - 1)))-(numStudents*2);
                discountPercent = ((discountPercent) * ((numStudents - 1)) * 3) / (numStudents + 1);
                discountPercent = Math.ceil(Math.min(discountPercent, maxDiscountPercent));
                //discount per student
                discount = baseFee * (discountPercent / 100);
                discount = Math.ceil(discount / 10) * 10;
                additionalFee = additionalFee / numStudents;
            }
            var totalFeePerStudent = baseFee + additionalFee;
            totalFeePerStudent = Math.ceil(totalFeePerStudent / 10) * 10;

            flatTotalFee = totalFeePerStudent * numStudents;
            totalFee = (totalFeePerStudent - discount) * numStudents;

            // Calculate minimum per head fee
            var minimumTotalFee = minimumPerHeadFee * numStudents;
            // Enforce minimum per head fee
            totalFee = Math.max(totalFee, minimumTotalFee);

            //rzpConvenienceFee = 0.0237*totalFee;
            //totalFee=totalFee+rzpConvenienceFee;
            if (totalFee > 0) {
                //ObjfeeResult.innerText = "Total session fee is ₹" + flatTotalFee.toFixed(2) + totalFee.toFixed(2);
                ObjfeeResult.style.display = "block";
                var perHeadFee = totalFee / numStudents;
                if (numStudents > 1) {
                    ObjDiscountShowoff.innerText = "Hurray! For " + numStudents + " students, we offer you a " + discountPercent.toFixed(0) + "% discount.";
                    ObjDiscountShowoff.style.display = "block";
                    ObjperHeadFeeResult.innerText = "per head fee is ₹" + perHeadFee.toFixed(0);
                    ObjperHeadFeeResult.style.display = "block";
                    ObjflatTotalFee.style.display = "inline";
                    ObjflatTotalFee.innerText = " ₹" + flatTotalFee.toFixed(0);
                }
                ObjtotalFee.innerText = " ₹" + totalFee.toFixed(0);
                objBooking_btn.innerText = "Book - ₹" + totalFee.toFixed(0);
                objBooking_btn.disabled = false;
                objBooking_btn.style.fontWeight = 'bold';
            }
        }
    
