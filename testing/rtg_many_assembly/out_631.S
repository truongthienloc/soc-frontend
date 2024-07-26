.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x3 , 5 
		lui     x9 , 3 
		lui     x23 , 1 
		lui     x2 , 6 
		sw      x12 , 36 (x3) 
		sw      x29 , 40 (x9) 
		sw      x7 , 44 (x23) 
		sw      x27 , 48 (x2) 
		lw      x13 , 48 (x2) 
		lw      x11 , 44 (x23) 
		lw      x10 , 40 (x9) 
		lw      x25 , 36 (x3) 
		bne     x25 , x12 , Fail
		bne     x10 , x29 , Fail
		bne     x11 , x7 , Fail
		bne     x13 , x27 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
