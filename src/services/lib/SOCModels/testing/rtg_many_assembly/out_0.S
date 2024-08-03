.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 6        //0 512 
		addi    x4 , x0 , 256       //4 513
		add     x10 , x0 , x0       //8 514
		addi    x19 , x0 , 32       //12 515
Loop:
		slli    x2 , x10 , 2        //16 524
		add     x9, x2 , x19        //20 525
		lw      x30 , 36 (x9)       //24 526
		add     x4 , x4 , x30       //28 527
		addi    x10 , x10 , 1       //32 528
		bne     x10 , x27 , Loop    //36 529
Result:
		addi    x25 , x0 , 256      //40 531
		bne     x25 , x4 , Fail     //44 532
Pass: 
		addi    x1 , x0 , 084       //48 533	
		jal     x0 , End            //52 534
Fail: 
		addi    x1 , x0 , 070       //56
End:
		addi    x1,  x0,  666       //64
		sw      x1, 32(x0)          //68
