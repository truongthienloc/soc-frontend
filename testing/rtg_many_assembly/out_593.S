.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x29 , 0 
		lui     x31 , 6 
		lui     x8 , 0 
		lui     x11 , 2 
		sw      x21 , 96 (x29) 
		sw      x3 , 100 (x31) 
		sw      x25 , 104 (x8) 
		sw      x20 , 108 (x11) 
		lw      x6 , 108 (x11) 
		lw      x28 , 104 (x8) 
		lw      x13 , 100 (x31) 
		lw      x10 , 96 (x29) 
		bne     x10 , x21 , Fail
		bne     x13 , x3 , Fail
		bne     x28 , x25 , Fail
		bne     x6 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
