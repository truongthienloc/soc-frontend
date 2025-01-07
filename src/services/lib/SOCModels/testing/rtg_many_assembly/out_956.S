.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x3 , 2 
		lui     x8 , 3 
		lui     x10 , 2 
		lui     x2 , 9 
		sw      x14 , 72 (x3) 
		sw      x23 , 76 (x8) 
		sw      x30 , 80 (x10) 
		sw      x21 , 84 (x2) 
		lw      x19 , 84 (x2) 
		lw      x11 , 80 (x10) 
		lw      x20 , 76 (x8) 
		lw      x4 , 72 (x3) 
		bne     x4 , x14 , Fail
		bne     x20 , x23 , Fail
		bne     x11 , x30 , Fail
		bne     x19 , x21 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
