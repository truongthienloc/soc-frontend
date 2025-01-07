.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 61 
		addi    x14 , x0 , 57 
		sltiu   x28 , x1 , 57 
		bltu    x1 , x14 , Less_i 
		bgeu    x1 , x14 , Bigger_i 
Less_i:
		ori     x6 , x1 , 187 
		sub     x30 , x14 , x1 
		srai    x30 , x30 , 1 
		and     x30 , x30 , x0 
		addi    x27 , x0 , 0 
		beq     x30 , x27 , Pass 
Bigger_i:
		ori     x6 , x1 , 143 
		sub     x30 , x14 , x1 
		srai    x30 , x30 , 3 
		and     x30 , x30 , x0 
		addi    x27 , x0 , 0 
		beq     x30 , x27 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
