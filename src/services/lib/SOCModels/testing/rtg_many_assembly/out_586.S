.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x4 , 0 
		lui     x23 , 3 
		lui     x18 , 1 
		lui     x29 , 5 
		sw      x21 , 84 (x4) 
		sw      x20 , 88 (x23) 
		sw      x25 , 92 (x18) 
		sw      x26 , 96 (x29) 
		lw      x6 , 96 (x29) 
		lw      x5 , 92 (x18) 
		lw      x12 , 88 (x23) 
		lw      x11 , 84 (x4) 
		bne     x11 , x21 , Fail
		bne     x12 , x20 , Fail
		bne     x5 , x25 , Fail
		bne     x6 , x26 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
