.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x21 , 8 
		lui     x7 , 2 
		lui     x9 , 0 
		lui     x29 , 2 
		sw      x12 , 16 (x21) 
		sw      x17 , 20 (x7) 
		sw      x25 , 24 (x9) 
		sw      x20 , 28 (x29) 
		lw      x28 , 28 (x29) 
		lw      x19 , 24 (x9) 
		lw      x11 , 20 (x7) 
		lw      x4 , 16 (x21) 
		bne     x4 , x12 , Fail
		bne     x11 , x17 , Fail
		bne     x19 , x25 , Fail
		bne     x28 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
