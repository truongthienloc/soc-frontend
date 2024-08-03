.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x25 , 9 
		lui     x28 , 8 
		lui     x12 , 2 
		lui     x11 , 1 
		sw      x15 , 28 (x25) 
		sw      x5 , 32 (x28) 
		sw      x31 , 36 (x12) 
		sw      x7 , 40 (x11) 
		lw      x17 , 40 (x11) 
		lw      x30 , 36 (x12) 
		lw      x3 , 32 (x28) 
		lw      x24 , 28 (x25) 
		bne     x24 , x15 , Fail
		bne     x3 , x5 , Fail
		bne     x30 , x31 , Fail
		bne     x17 , x7 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
