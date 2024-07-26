.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x12 , 2
		auipc    x28 , 0
		auipc    x25 , 2
		auipc    x23 , 4
		lui      x24 , 2
		lui      x16 , 2
		lui      x10 , 5
		lui      x9 , 6
		sw       x20 , 112 (x12) 
		sw       x22 , 116 (x28) 
		sw       x5 , 120 (x25) 
		sw       x11 , 124 (x23) 
		sw       x27 , 128 (x24) 
		sw       x30 , 132 (x16) 
		sw       x4 , 136 (x10) 
		sw       x1 , 140 (x9) 
		lw       x18 , 140 (x9) 
		lw       x29 , 136 (x10) 
		lw       x3 , 132 (x16) 
		lw       x13 , 128 (x24) 
		lw       x14 , 124 (x23) 
		lw       x15 , 120 (x25) 
		lw       x19 , 116 (x28) 
		lw       x7 , 112 (x12) 
		bne      x7 , x20 , Fail
		bne      x19 , x22 , Fail
		bne      x15 , x5 , Fail
		bne      x14 , x11 , Fail
		bne      x13 , x27 , Fail
		bne      x3 , x30 , Fail
		bne      x29 , x4 , Fail
		bne      x18 , x1 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
