.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x20 , x0 , 4 
		add     x21 , x0 , x0 
		add     x19 , x0 , x0 
		addi    x15 , x0 , 12 
InArr:
		addi    x29 , x0 , 68 
		addi    x7 , x0 , 68 
		addi    x22 , x0 , 72 
		addi    x26 , x0 , 48 
		sb      x29 , 52 (x15) 
		sb      x7 , 56 (x15) 
		sb      x22 , 60 (x15) 
		sb      x26 , 64 (x15) 
Loop:
		slli    x11 , x19 , 2 
		add     x3 , x11 , x15 
		lb      x13 , 52 (x3) 
		add     x21 , x21 , x13 
		addi    x19 , x19 , 1 
		beq     x19 , x20 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 256 
		bne     x14 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
