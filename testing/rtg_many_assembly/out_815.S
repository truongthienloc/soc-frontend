.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x13 , x0 , x0 
		add     x20 , x0 , x0 
		addi    x5 , x0 , 76 
InArr:
		addi    x18 , x0 , 24 
		addi    x8 , x0 , 52 
		addi    x15 , x0 , 12 
		addi    x25 , x0 , 44 
		sb      x18 , 60 (x5) 
		sb      x8 , 64 (x5) 
		sb      x15 , 68 (x5) 
		sb      x25 , 72 (x5) 
Loop:
		slli    x31 , x20 , 2 
		add     x1 , x31 , x5 
		lb      x3 , 60 (x1) 
		add     x13 , x13 , x3 
		addi    x20 , x20 , 1 
		beq     x20 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x4 , x0 , 132 
		bne     x4 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
