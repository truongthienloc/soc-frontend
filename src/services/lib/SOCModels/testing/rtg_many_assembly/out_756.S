.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x25 , 9 
		lui     x4 , 5 
		lui     x12 , 6 
		lui     x11 , 8 
		sw      x27 , 32 (x25) 
		sw      x20 , 36 (x4) 
		sw      x24 , 40 (x12) 
		sw      x8 , 44 (x11) 
		lw      x18 , 44 (x11) 
		lw      x14 , 40 (x12) 
		lw      x15 , 36 (x4) 
		lw      x7 , 32 (x25) 
		bne     x7 , x27 , Fail
		bne     x15 , x20 , Fail
		bne     x14 , x24 , Fail
		bne     x18 , x8 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
