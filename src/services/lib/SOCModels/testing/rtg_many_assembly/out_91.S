.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x17 , x0 , 4 
		add     x3 , x0 , x0 
		add     x28 , x0 , x0 
		addi    x16 , x0 , 52 
		addi    x5 , x0 , 2 
InArr:
		addi    x26 , x0 , 36 
		addi    x2 , x0 , 0 
		addi    x27 , x0 , 48 
		addi    x19 , x0 , 76 
		sh      x26 , 4 (x16) 
		sh      x2 , 8 (x16) 
		sh      x27 , 12 (x16) 
		sh      x19 , 16 (x16) 
Loop:
		sll     x9 , x28 , x5 
		add     x29 , x9 , x16 
		lhu     x14 , 4 (x29) 
		add     x3 , x3 , x14 
		addi    x28 , x28 , 1 
		beq     x28 , x17 , Result 
		jal     x0 , Loop 
Result:
		addi    x10 , x0 , 160 
		bne     x10 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
