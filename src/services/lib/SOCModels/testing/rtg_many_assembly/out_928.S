.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x7 , x0 , 4 
		add     x3 , x0 , x0 
		add     x20 , x0 , x0 
		addi    x29 , x0 , 0 
		addi    x28 , x0 , 2 
InArr:
		addi    x1 , x0 , 12 
		addi    x19 , x0 , 68 
		addi    x13 , x0 , 72 
		addi    x30 , x0 , 36 
		sh      x1 , 56 (x29) 
		sh      x19 , 60 (x29) 
		sh      x13 , 64 (x29) 
		sh      x30 , 68 (x29) 
Loop:
		sll     x21 , x20 , x28 
		add     x10 , x21 , x29 
		lhu     x16 , 56 (x10) 
		add     x3 , x3 , x16 
		addi    x20 , x20 , 1 
		beq     x20 , x7 , Result 
		jal     x0 , Loop 
Result:
		addi    x5 , x0 , 188 
		bne     x5 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
