.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 3 
		addi    x8 , x0 , 183 
		sltiu   x20 , x28 , 183 
		bltu    x28 , x8 , Less_i 
		bgeu    x28 , x8 , Bigger_i 
Less_i:
		ori     x15 , x28 , 29 
		sub     x21 , x8 , x28 
		srai    x21 , x21 , 0 
		and     x21 , x21 , x0 
		addi    x9 , x0 , 0 
		beq     x21 , x9 , Pass 
Bigger_i:
		ori     x15 , x28 , 173 
		sub     x21 , x8 , x28 
		srai    x21 , x21 , 4 
		and     x21 , x21 , x0 
		addi    x9 , x0 , 0 
		beq     x21 , x9 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
