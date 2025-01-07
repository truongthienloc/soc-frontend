.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 198 
		addi    x28 , x0 , 197 
		sltu    x8 , x9 , x28 
		bltu    x9 , x28 , Less_i 
		bgeu    x9 , x28 , Bigger_i 
Less_i:
		ori     x3 , x9 , 154 
		sub     x7 , x28 , x9 
		srai    x7 , x7 , 3 
		and     x7 , x7 , x0 
		addi    x2 , x0 , 0 
		beq     x7 , x2 , Pass 
Bigger_i:
		ori     x3 , x9 , 162 
		sub     x7 , x28 , x9 
		srai    x7 , x7 , 3 
		and     x7 , x7 , x0 
		addi    x2 , x0 , 0 
		beq     x7 , x2 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
