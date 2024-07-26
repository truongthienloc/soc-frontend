.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x31 , 3
		auipc    x16 , 6
		auipc    x10 , 0
		auipc    x30 , 8
		lui      x3 , 2
		lui      x23 , 9
		lui      x7 , 3
		lui      x13 , 0
		sw       x6 , 116 (x31) 
		sw       x26 , 120 (x16) 
		sw       x1 , 124 (x10) 
		sw       x18 , 128 (x30) 
		sw       x12 , 132 (x3) 
		sw       x9 , 136 (x23) 
		sw       x5 , 140 (x7) 
		sw       x24 , 144 (x13) 
		lw       x28 , 144 (x13) 
		lw       x27 , 140 (x7) 
		lw       x29 , 136 (x23) 
		lw       x25 , 132 (x3) 
		lw       x17 , 128 (x30) 
		lw       x15 , 124 (x10) 
		lw       x11 , 120 (x16) 
		lw       x20 , 116 (x31) 
		bne      x20 , x6 , Fail
		bne      x11 , x26 , Fail
		bne      x15 , x1 , Fail
		bne      x17 , x18 , Fail
		bne      x25 , x12 , Fail
		bne      x29 , x9 , Fail
		bne      x27 , x5 , Fail
		bne      x28 , x24 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
