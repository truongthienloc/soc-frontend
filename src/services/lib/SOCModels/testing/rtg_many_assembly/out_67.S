.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 122 
		addi    x7 , x0 , 193 
		sltiu   x29 , x9 , 193 
		bltu    x9 , x7 , Less_i 
		bgeu    x9 , x7 , Bigger_i 
Less_i:
		ori     x22 , x9 , 191 
		sub     x14 , x7 , x9 
		srai    x14 , x14 , 1 
		and     x14 , x14 , x0 
		addi    x3 , x0 , 0 
		beq     x14 , x3 , Pass 
Bigger_i:
		ori     x22 , x9 , 195 
		sub     x14 , x7 , x9 
		srai    x14 , x14 , 0 
		and     x14 , x14 , x0 
		addi    x3 , x0 , 0 
		beq     x14 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
