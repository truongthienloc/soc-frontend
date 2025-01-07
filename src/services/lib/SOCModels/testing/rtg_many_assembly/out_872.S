.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x28 , x0 , 4 
		add     x14 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x21 , x0 , 16 
		addi    x17 , x0 , 2 
InArr:
		addi    x24 , x0 , 76 
		addi    x1 , x0 , 72 
		addi    x5 , x0 , 8 
		addi    x30 , x0 , 40 
		sh      x24 , 40 (x21) 
		sh      x1 , 44 (x21) 
		sh      x5 , 48 (x21) 
		sh      x30 , 52 (x21) 
Loop:
		sll     x18 , x25 , x17 
		add     x6 , x18 , x21 
		lhu     x22 , 40 (x6) 
		add     x14 , x14 , x22 
		addi    x25 , x25 , 1 
		beq     x25 , x28 , Result 
		jal     x0 , Loop 
Result:
		addi    x9 , x0 , 196 
		bne     x9 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
