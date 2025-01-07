.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x1 , 7
		auipc    x15 , 3
		auipc    x26 , 0
		auipc    x28 , 6
		lui      x11 , 6
		lui      x31 , 7
		lui      x23 , 5
		lui      x8 , 0
		sw       x19 , 100 (x1) 
		sw       x21 , 104 (x15) 
		sw       x2 , 108 (x26) 
		sw       x17 , 112 (x28) 
		sw       x5 , 116 (x11) 
		sw       x25 , 120 (x31) 
		sw       x16 , 124 (x23) 
		sw       x14 , 128 (x8) 
		lw       x29 , 128 (x8) 
		lw       x30 , 124 (x23) 
		lw       x13 , 120 (x31) 
		lw       x10 , 116 (x11) 
		lw       x3 , 112 (x28) 
		lw       x20 , 108 (x26) 
		lw       x9 , 104 (x15) 
		lw       x4 , 100 (x1) 
		bne      x4 , x19 , Fail
		bne      x9 , x21 , Fail
		bne      x20 , x2 , Fail
		bne      x3 , x17 , Fail
		bne      x10 , x5 , Fail
		bne      x13 , x25 , Fail
		bne      x30 , x16 , Fail
		bne      x29 , x14 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
