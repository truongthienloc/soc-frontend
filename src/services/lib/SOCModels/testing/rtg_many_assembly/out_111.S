.text

#The program checks the ALU instruction in I_type

Main:
		addi    x4 , x0 , 141 
		addi    x22 , x0 , 181 
		sltiu   x12 , x4 , 181 
		bltu    x4 , x22 , Less_i 
		bgeu    x4 , x22 , Bigger_i 
Less_i:
		ori     x28 , x4 , 120 
		sub     x21 , x22 , x4 
		srai    x21 , x21 , 1 
		and     x21 , x21 , x0 
		addi    x7 , x0 , 0 
		beq     x21 , x7 , Pass 
Bigger_i:
		ori     x28 , x4 , 92 
		sub     x21 , x22 , x4 
		srai    x21 , x21 , 0 
		and     x21 , x21 , x0 
		addi    x7 , x0 , 0 
		beq     x21 , x7 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
