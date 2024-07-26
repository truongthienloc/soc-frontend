.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 156 
		addi    x22 , x0 , 100 
		sltiu   x19 , x28 , 100 
		bltu    x28 , x22 , Less_i 
		bgeu    x28 , x22 , Bigger_i 
Less_i:
		ori     x31 , x28 , 178 
		sub     x2 , x22 , x28 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x9 , x0 , 0 
		beq     x2 , x9 , Pass 
Bigger_i:
		ori     x31 , x28 , 62 
		sub     x2 , x22 , x28 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x9 , x0 , 0 
		beq     x2 , x9 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
