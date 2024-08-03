.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x6 , 8 
		lui     x21 , 8 
		lui     x20 , 4 
		lui     x5 , 6 
		sw      x18 , 24 (x6) 
		sw      x23 , 28 (x21) 
		sw      x24 , 32 (x20) 
		sw      x27 , 36 (x5) 
		lw      x17 , 36 (x5) 
		lw      x31 , 32 (x20) 
		lw      x26 , 28 (x21) 
		lw      x11 , 24 (x6) 
		bne     x11 , x18 , Fail
		bne     x26 , x23 , Fail
		bne     x31 , x24 , Fail
		bne     x17 , x27 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
