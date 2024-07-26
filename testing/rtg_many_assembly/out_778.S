.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x5 , x0 , 4 
		add     x1 , x0 , x0 
		add     x19 , x0 , x0 
		addi    x10 , x0 , 56 
InArr:
		addi    x22 , x0 , 76 
		addi    x9 , x0 , 76 
		addi    x28 , x0 , 36 
		addi    x21 , x0 , 20 
		sb      x22 , 44 (x10) 
		sb      x9 , 48 (x10) 
		sb      x28 , 52 (x10) 
		sb      x21 , 56 (x10) 
Loop:
		slli    x20 , x19 , 2 
		add     x8 , x20 , x10 
		lb      x6 , 44 (x8) 
		add     x1 , x1 , x6 
		addi    x19 , x19 , 1 
		beq     x19 , x5 , Result 
		jal     x0 , Loop 
Result:
		addi    x26 , x0 , 208 
		bne     x26 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
