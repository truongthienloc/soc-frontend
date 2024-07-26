.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x7 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x30 , x0 , 28 
InArr:
		addi    x20 , x0 , 4 
		addi    x28 , x0 , 56 
		addi    x6 , x0 , 12 
		addi    x13 , x0 , 68 
		sb      x20 , 44 (x30) 
		sb      x28 , 48 (x30) 
		sb      x6 , 52 (x30) 
		sb      x13 , 56 (x30) 
Loop:
		slli    x9 , x17 , 2 
		add     x24 , x9 , x30 
		lb      x18 , 44 (x24) 
		add     x7 , x7 , x18 
		addi    x17 , x17 , 1 
		beq     x17 , x22 , Result 
		jal     x0 , Loop 
Result:
		addi    x26 , x0 , 140 
		bne     x26 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
