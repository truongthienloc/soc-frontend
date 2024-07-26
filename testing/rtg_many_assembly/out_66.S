.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x1 , x0 , 4 
		add     x19 , x0 , x0 
		add     x8 , x0 , x0 
		addi    x9 , x0 , 52 
		addi    x10 , x0 , 2 
InArr:
		addi    x11 , x0 , 4 
		addi    x28 , x0 , 16 
		addi    x24 , x0 , 60 
		addi    x4 , x0 , 16 
		sb      x11 , 68 (x9) 
		sb      x28 , 72 (x9) 
		sb      x24 , 76 (x9) 
		sb      x4 , 80 (x9) 
Loop:
		sll     x18 , x8 , x10 
		add     x26 , x18 , x9 
		lb     x29 , 68 (x26) 
		add     x19 , x19 , x29 
		addi    x8 , x8 , 1 
		beq     x8 , x1 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 96 
		bne     x14 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
