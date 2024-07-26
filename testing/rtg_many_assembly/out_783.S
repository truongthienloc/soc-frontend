.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 177 
		addi    x22 , x0 , 55 
		sltiu   x2 , x26 , 55 
		bltu    x26 , x22 , Less_i 
		bgeu    x26 , x22 , Bigger_i 
Less_i:
		ori     x6 , x26 , 126 
		sub     x4 , x22 , x26 
		srai    x4 , x4 , 3 
		and     x4 , x4 , x0 
		addi    x14 , x0 , 0 
		beq     x4 , x14 , Pass 
Bigger_i:
		ori     x6 , x26 , 128 
		sub     x4 , x22 , x26 
		srai    x4 , x4 , 1 
		and     x4 , x4 , x0 
		addi    x14 , x0 , 0 
		beq     x4 , x14 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
