.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x24 , 8
		lui      x4 , 4
		lui      x30 , 2
		lui      x5 , 3
		lui      x11 , 1
		lui      x20 , 1
		lui      x16 , 8
		lui      x19 , 9
		sw       x15 , 100 (x24) 
		sw       x27 , 104 (x4) 
		sw       x21 , 108 (x30) 
		sw       x18 , 112 (x5) 
		sw       x23 , 116 (x11) 
		sw       x14 , 120 (x20) 
		sw       x6 , 124 (x16) 
		sw       x31 , 128 (x19) 
		lw       x2 , 128 (x19) 
		lw       x28 , 124 (x16) 
		lw       x12 , 120 (x20) 
		lw       x25 , 116 (x11) 
		lw       x29 , 112 (x5) 
		lw       x10 , 108 (x30) 
		lw       x26 , 104 (x4) 
		lw       x17 , 100 (x24) 
		bne      x17 , x15 , Fail
		bne      x26 , x27 , Fail
		bne      x10 , x21 , Fail
		bne      x29 , x18 , Fail
		bne      x25 , x23 , Fail
		bne      x12 , x14 , Fail
		bne      x28 , x6 , Fail
		bne      x2 , x31 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
